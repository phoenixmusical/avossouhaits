import React, { PureComponent } from 'react';

export default class Reglements extends PureComponent {
    render() {
        return (
            <div id="reglements">
                <h5>Règlements</h5>
                <ol>
                    <li>
                        Le Phoenix Musical s’engage à fournir les ressources humaines pour la réalisation du projet
                        (maximum de 5 personnes pour une durée maximale de 10h, de manière continue ou
                        discontinue). Le matériel (s’il y a lieu) doit être fourni par le participant. Le Phoenix Musical
                        n’engagera aucune dépense. La réalisation du souhait inclut une rencontre préalable afin de
                        planifier la réalisation du souhait, le cas échéant.
                    </li>
                    <li>
                        Les personnes qui participeront à la réalisation du souhait seront des membres du Phoenix
                        Musical ou de proches collaborateurs, choisis par la direction du Phoenix Musical en fonction
                        de leurs talents et leurs aptitudes pouvant être utiles à la réalisation du souhait.
                    </li>
                    <li>
                        La réalisation du souhait ne doit entraîner aucun acte illégal et doit rester dans les limites du
                        bon goût et de la décence. Si le souhait implique la présence d’enfants, le parent ou titulaire
                        de l’autorité parentale doit être présent pour toute la durée de la réalisation du souhait.
                    </li>
                    <li>
                        Le Phoenix Musical se réserve le droit de refuser de réaliser un vœu qui présente des
                        contraintes excessives ou pour lequel aucun membre du Phoenix Musical ne possède les
                        aptitudes requises. Le cas échéant, le participant sera contacté et aura la possibilité de
                        modifier son souhait.
                    </li>
                </ol>
            </div>
        );
    }
}
