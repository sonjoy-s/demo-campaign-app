import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filter = () => {
    let data = [];

    data = (name && (name.length > 1)) ? campaigns.filter(campaign => campaign.name.includes(name)) : [...campaigns];

    if (startDate && endDate) {
      let rangeStart = new Date(startDate);
      let rangeTo    = new Date(endDate);

      data = data.filter(campaign => ((new Date(campaign.startDate) > rangeStart) && (new Date(campaign.endDate )< rangeTo)));
    }

    return data;
  };

  useEffect(() => {
    const addCampaigns = (data) => {
      let today = new Date();

      setCampaigns([...campaigns, ...data.map(campaign => {
        campaign.key    = (Math.random() + 1).toString(36).substring(7);
        campaign.budget = campaign.Budget || campaign['B udget'] || campaign[' Budget'] || campaign['Bu dget'];
        campaign.active = ((new Date(campaign.startDate)) < today) && ((new Date(campaign.endDate)) > today);

        return campaign;
      })]);
    };

    window.AddCampaigns = addCampaigns;

    console.log('%c[AddCampaigns method exposed for demo test purpose]', 'color:red;font-size:1rem');

    return function() {
      delete window.AddCampaigns;
    };
  }, [campaigns]);

  return (
    <div className="container">
      <div className="search-container">
        <div className="row">
          <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" placeholder="Start date"/>
          <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" placeholder="End date"/>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Search by name" />
        </div>
      </div>
      <table cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Active</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {(filter().length > 0) ? filter().map(campaign => (
            <tr key={campaign.key}>
              <td>{campaign.name}</td>
              <td>{campaign.startDate}</td>
              <td>{campaign.endDate}</td>
              <td>
                <span className={campaign.active ? 'active' : 'inactive'}></span>
                {campaign.active ? 'Active' : 'Inactive'}
              </td>
              <td>{(campaign.budget / 1000).toFixed(1)}k USD</td>
            </tr>
          )) : (
            <tr>
              <td className="text-center" colSpan="5">No data found</td>
            </tr>
          )}
        </tbody>
        
      </table>
    </div>
  );
}

export default App;
