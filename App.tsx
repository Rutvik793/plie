// import React from 'react';

// import StackNavigation from './src/navigation/StackNavigation';
// import {AuthProvider} from './src/storage/AuthContext';
// import {NavigationContainer} from '@react-navigation/native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {Provider} from 'react-redux';
// import {store} from './src/storage/store';

// function App() {
//   return (
//     <SafeAreaProvider>
//       <Provider store={store}>
//         <AuthProvider>
//           <NavigationContainer>
//             <StackNavigation />
//           </NavigationContainer>
//         </AuthProvider>
//       </Provider>
//     </SafeAreaProvider>
//   );
// }

// export default App;

// import React from 'react';
// import {Provider} from 'react-redux';

// import StackNavigation from './src/navigation/StackNavigation';
// import {AuthProvider} from './src/storage/AuthContext';
// import {NavigationContainer} from '@react-navigation/native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {store} from './src/storage/store';

// function App() {
//   return (
//     <Provider store={store}>
//       <SafeAreaProvider>
//         <AuthProvider>
//           <NavigationContainer>
//             <StackNavigation />
//           </NavigationContainer>
//         </AuthProvider>
//       </SafeAreaProvider>
//     </Provider>
//   );
// }

// export default App;

import React, {useContext} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/storage/store';
import {AuthProvider, AuthContext} from './src/storage/AuthContext';
import TabbarNavigation from './src/navigation/TabbarNavigation';
import StackNavigation from './src/navigation/StackNavigation';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const MainNavigator = () => {
  const {authToken} = useContext(AuthContext);

  // Render the appropriate navigation based on the presence of authToken
  return authToken ? <TabbarNavigation /> : <StackNavigation />;
};

export default App;
