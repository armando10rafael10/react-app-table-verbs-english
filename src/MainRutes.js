import React from "react";
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Table from './components/Table';
import ComponentMenu from './components/ComponentMenu';
import Menu from './components/Menu';
import CardCarrousel from './components/Card-Carrousel';
import CardsInteractives from './components/CardsInteractives';
import AdminText from "./components/AdminText";
import AdminFormPictures from "./components/AdminFormPictures";
import AdminFormIrregular from "./components/AdminFormIrregular";
import AdminFormRegular from "./components/AdminFormRegular";

function MainRutes(){
  return(
        <React.Fragment>
            <Router>
                <Route path="/" component={ComponentMenu} />
                {/* <Route path="/" component={Menu} /> */}
                <Route path="/menu" component={Menu} />
                <Route path="/list" component={Table} />
                <Route path="/card" component={CardCarrousel} />
                <Route path="/AdminText" component={AdminText} />
                <Route path="/AdminFormPictures" component={AdminFormPictures} />
                <Route path="/AdminFormRegular" component={AdminFormRegular} />
                <Route path="/AdminAdminFormIrregular" component={AdminFormIrregular} />
                <Route path="/card-interactive" component={CardsInteractives} />
            </Router>
        </React.Fragment>
  );
}
export default MainRutes;