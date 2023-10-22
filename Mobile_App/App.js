import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Topup from './components/Topup';
import QR from './components/QR';
import MyBooking from './components/MyBooking';
import Details from './components/Details';
import Booking from './components/Booking';
import Payment from './components/Payment';
import Loading from './components/Loading';
import Welcome from './components/Welcome';
import GeneratorQR from './components/GeneratorQR';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...'], (isAffected, bundle) => {
  return isAffected || bundle.includes('example.js');
});

const App = createStackNavigator({
    Loading                     : { screen: Loading }, 
    Welcome                     : { screen: Welcome },
    GeneratorQR                 : { screen: GeneratorQR },
    HomePage                    : { screen: HomePage },
    MyBooking                   : { screen: MyBooking },
    Topup                       : { screen: Topup },
    Details                     : { screen: Details },
    Booking                     : { screen: Booking },
    Payment                     : { screen: Payment },
    QR                          : { screen: QR }, 
    Login                       : { screen: Login }, 
    Register                    : { screen: Register },
  },
  {
    initialRouteName: 'Loading',
  }
);
export default createAppContainer(App);