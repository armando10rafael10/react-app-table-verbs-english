import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchway,faSitemap,faListOl,faBacon,faRuler,faPersonBooth,faPeopleArrows,faInfoCircle,
    faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faBloggerB,faFacebook,faTwitter,faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Menu.css';


function Menu(){
	
	function ver(n) {
		if(n==="00"){
			document.getElementById("borrar").style.height="270px";
		}else{
			var id = "sub"+n;
			document.getElementById(id.toString()).style.display="block";
		}
	}
	function ocultar(n) {
		if(n==="00"){
			document.getElementById("borrar").style.height="0px";
		}else{
			var id = "sub"+n;
			document.getElementById(id.toString()).style.display="none";
		}
	}

	return (
		<React.Fragment>
			<div className="navegador" onMouseOver={()=> ver("00")} onMouseOut={()=> {ocultar("00")}}>
				<ul>
					<li className="logo">
						<div className="logo-main">
							<FontAwesomeIcon className="blogger-ico" icon={faBloggerB}/>
							<Link className="logo-link" to="/list">Verbs English</Link>
						</div>
					</li>
					<li className="home">
						<Link className="link-table" to="/list">
							<div className="icono-main">
								<FontAwesomeIcon icon={faArchway}/>
							</div>
							<h2>Inicio</h2>
						</Link>
					</li>
					<li className="s1" id="s1" onMouseOver={()=> ver(1)} onMouseOut={()=> {ocultar(1)}}>
							<Link className="link-table" to="/list">
								<div className="icono-main">
									<FontAwesomeIcon icon={faSitemap}/>
								</div>
								<h2>Mas Opciones</h2>
							</Link>
							<div id="sub1">
								<div>
									<Link className="link-table" to="/list">
										<div className="content-ico">
											<FontAwesomeIcon className="listverbs-ico" icon={faListOl}/>
										</div>
										<h2>lista de verbos</h2>
									</Link>
								</div>
								<div>
									<Link className="link-table" to="/list">
										<div className="content-ico">
											<FontAwesomeIcon className="irregular-ico" icon={faBacon}/>
										</div>
										<h2>verbos irregulares</h2>
									</Link>
								</div>
								<div>
									<Link className="link-table" to="/list">
										<div className="content-ico">
											<FontAwesomeIcon className="regular-ico" icon={faRuler}/>
										</div>
										<h2>verbos regular</h2>
									</Link>
								</div>
								<div>
									<Link className="link-table" to="/list">
										<div className="content-ico">
											<FontAwesomeIcon className="history-ico" icon={faPersonBooth}/>
										</div>
										<h2>historias de verbos</h2>
									</Link>
								</div>
								<div>
									<Link className="link-table" to="/list">
										<div className="content-ico">
											<FontAwesomeIcon className="sugerency-ico" icon={faPeopleArrows}/>
										</div>
										<h2>sugerencia de verbos</h2>
									</Link>
								</div>
							</div>
					</li>
					<li className="s2" id="s2" onMouseOver={()=> ver(2)} onMouseOut={()=> {ocultar(2)}}>
						<Link className="link-table" to="/list">
							<div className="icono-main">
								<FontAwesomeIcon icon={faUserFriends}/>
							</div>
							<h2>Contactanos</h2>
						</Link>
						<div id="sub2">
							<div>
								<Link className="link-table" to="/list">
									<div className="content-ico">
										<FontAwesomeIcon className="facebook-ico" icon={faFacebook}/>
									</div>
									<h2>facebook</h2>
								</Link>
							</div>
							<div>
								<Link className="link-table" to="/list">
									<div className="content-ico">
										<FontAwesomeIcon className="twitter-ico" icon={faTwitter}/>
									</div>
									<h2>twitter</h2>
								</Link>
							</div>
							<div>
								<Link className="link-table" to="/list">
									<div className="content-ico">
										<FontAwesomeIcon className="youtube-ico" icon={faYoutube}/>
									</div>
									<h2>youtube</h2>
								</Link>
							</div>
						</div>			
					</li>
					<li className="about">
						<Link className="link-table" to="/list">
							<div className="icono-main">
								<FontAwesomeIcon icon={faInfoCircle}/>
							</div>
							<h2>acerca de</h2>
						</Link>
					</li>
				</ul>
				<div className="borrar" id="borrar"></div>
			</div>
		</React.Fragment>
	)
} 
export default Menu;