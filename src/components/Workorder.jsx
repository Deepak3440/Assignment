import React, { useState } from 'react';
import { Add, ArrowForward } from '@mui/icons-material';
import './Workorder.css';

function Table() {
  const [showTable, setShowTable] = useState(true);
  const [tableData, setTableData] = useState([
    {
      package: 'Civil 1',
      rate: '$100',
      total: '$500',
      content: [
        {
          item: 'Activity 1',
          total: '$100', 
          data: [
            { name: 'WorkItem 1', selected: false, total: '$50' }, 
            { name: 'Data 2', selected: false, total: '$30' }, 
            { name: 'Data 3', selected: false, total: '$20' }, 
          ],
          expanded: false,
          selected: false
        }
      ],
      expanded: false,
      selected: false
    },
    {
      package: 'Civil 2',
      rate: '$200',
      total: '$1000', 
      content: [
        {
          item: 'Activity 2',
          total: '$200', 
          data: [
            { name: 'WorkItem 4', selected: false, total: '$100' }, 
            { name: 'Data 5', selected: false, total: '$60' }, 
            { name: 'Data 6', selected: false, total: '$40' }, 
          ],
          expanded: false,
          selected: false
        }
      ],
      expanded: false,
      selected: false
    },
    {
      package: 'Civil 3',
      rate: '$300',
      total: '$1500',
      content: [
        {
          item: 'Activity 3',
          total: '$300', 
          data: [
            { name: 'WorkItem 7', selected: false, total: '$150' }, 
            { name: 'Data 8', selected: false, total: '$90' }, 
            { name: 'Data 9', selected: false, total: '$60' }, 
          ],
          expanded: false,
          selected: false
        }
      ],
      expanded: false,
      selected: false
    },
  ]);

  const handleRowClick = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].expanded = !updatedTableData[index].expanded;
    setTableData(updatedTableData);
  };

  const handleItemClick = (index, itemIndex) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].content[itemIndex].expanded = !updatedTableData[index].content[itemIndex].expanded;
    setTableData(updatedTableData);
  };

 const handleDataCheckboxChange = (packageIndex, itemIndex, dataIndex) => {
    const updatedTableData = [...tableData];
    updatedTableData[packageIndex].content[itemIndex].data[dataIndex].selected = !updatedTableData[packageIndex].content[itemIndex].data[dataIndex].selected;
  
    const anyDataUnchecked = updatedTableData[packageIndex].content[itemIndex].data.some(data => !data.selected);
    updatedTableData[packageIndex].content[itemIndex].selected = !anyDataUnchecked;
  
    let anyItemUnchecked = false;
    updatedTableData[packageIndex].content.forEach(item => {
      if (!item.selected) {
        anyItemUnchecked = true;
      }
    });
    updatedTableData[packageIndex].selected = !anyItemUnchecked;
  
    setTableData(updatedTableData);
  };
  
  
  const handleCheckboxChange = (type, packageIndex, itemIndex = null) => {
    const updatedTableData = [...tableData];
    
    if (type === 'package') {
      updatedTableData[packageIndex].selected = !updatedTableData[packageIndex].selected;
      updatedTableData[packageIndex].content.forEach(item => {
        item.selected = updatedTableData[packageIndex].selected;
        item.data.forEach(data => data.selected = item.selected);
        item.expanded = updatedTableData[packageIndex].selected;
      });
    } else if (type === 'item') {
      updatedTableData[packageIndex].content[itemIndex].selected = !updatedTableData[packageIndex].content[itemIndex].selected;
      updatedTableData[packageIndex].content[itemIndex].data.forEach(data => data.selected = updatedTableData[packageIndex].content[itemIndex].selected);
      updatedTableData[packageIndex].content[itemIndex].expanded = updatedTableData[packageIndex].content[itemIndex].selected;
  
      const allItemsUnchecked = updatedTableData[packageIndex].content.every(item => !item.selected);

      updatedTableData[packageIndex].selected = !allItemsUnchecked;
    }
    
    setTableData(updatedTableData);
  };
  
  const handleButtonClick = (show) => {
    setShowTable(show);
  };

  const handleSave = () => {
    console.log('Data saved!');
  };

  return (
    <div className="table-container">
      <h2 className='left'>WorkOrder <ArrowForward /></h2>

      <div className="toggle-buttons">
        <button onClick={() => handleButtonClick(true)}>Overview</button>
        <button onClick={() => handleButtonClick(false)}>Others</button>
        <hr/>
      </div>
      {showTable && (
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Package</th>
                <th>Rate</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <React.Fragment key={index}>
                  <tr
                    onClick={() => handleRowClick(index)}
                    className={row.expanded ? 'active' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange('package', index)}
                        checked={row.selected || false}
                      />
                    </td>
                    <td>{row.package}</td>
                    <td>{row.rate}</td>
                    <td>{row.total}</td>
                    <td><Add /></td>
                  </tr>
                  {row.expanded && row.content.map((item, itemIndex) => (
                    <React.Fragment key={`${index}-${itemIndex}`}>
                      <tr
                        onClick={() => handleItemClick(index, itemIndex)}
                        className={item.expanded ? 'nested-row active' : 'nested-row'}
                      >
                        <td>
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange('item', index, itemIndex)}
                            checked={item.selected || false}
                          />
                        </td>
                        <td>{item.item}</td>
                        <td>{item.total}</td>
                        <td></td>
                       <td></td>
                      </tr>
                      {item.expanded && item.data.map((data, dataIndex) => (
                        <tr key={`${index}-${itemIndex}-${dataIndex}`} className="nested-data-row">
                          <td>
                            <input
                              type="checkbox"
                              onChange={() => handleDataCheckboxChange(index, itemIndex, dataIndex)}
                              checked={data.selected || false}
                            />
                          </td>
                          <td colSpan="2">{data.name}</td>
                          <td>{data.total}</td>
                          <td></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!showTable && (
        <div className="centered-content">
          <h2>Hello World!</h2>
        </div>
      )}
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
}

export default Table;
