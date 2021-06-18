import './App.css';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import RouterOutlet from './index.route';



function App() {
  return (
    <div className="App" style={{padding: 5}}>
      <ConfigProvider>
        <RouterOutlet/>
      </ConfigProvider>
    </div>
  );
}

export default App;