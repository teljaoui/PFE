import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'

export default function FinalCommande() {
    return (
        <>
            <Meta title={"Checkout"} />
            <BreadCrumb title={"Checkout"} />
            <div className="chekout-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="finale">
                        <h4>commande réussie</h4>
                        <h5>Le paiement par carte n'est pas disponible pour le moment. Le paiement sera effectué à réception.</h5>
                        <img src="images/trcuk.gif" width={200} alt="" />
                        <h4>Votre commande est maintenant en cours d'expédition</h4>
                        <br />
                        <Link to="/store" className="buttonbg">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
