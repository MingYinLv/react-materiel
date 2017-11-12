import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/materiel'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
