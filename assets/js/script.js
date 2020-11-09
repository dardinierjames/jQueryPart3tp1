var secondes = 30; /*permet de définir le temps du chrono*/ 
var figure = 0; /*permet de définir le nombre à trouver*/
var numberMaximum = 80;/*valeur max du nombre à trouver*/
var bets = null; /*valeur par défault proposé dans l'input qui affichera la valeur du nombre que l'on soumait*/
var play = true; /*variable qui permet de continuer à jouer et rejouer*/
var count = 1;/*valeur de la variable essai est 1 */

$('document').ready(function() {

    $('.numberMax').html(numberMaximum);
// permet d'afficher le nombre max choisi au chargement de la page

    $('#start').click(function() {
// au click sur le bouton commencer
        $('#number').val('')
// je remets toutes les valeurs de mon input à 0 (ensemble vide).
        secondes = 30;
        $('.chrono').html(secondes);
// je remets le chrono à son état initial.
        play = true;
        $('.reponse').html('Trouver le bon nombre !');
// si la variable play est vrai je réaffiche 'le message entre côte'.
        figure = Math.floor(Math.random() * numberMaximum);
// fonction pour trouver un nombre aléatoire compris entre 0 et la valeur max.
        $('#bet').css({'visibility' : 'visible', 'opacity' : '1'})
// permet de rendre visible le "form" au click de la souris sur le bouton commencer (id "start") ciblé par id "bet".
        var countDown = setInterval(function() {
            if (secondes == 0) {
                clearInterval(countDown);
                $('.reponse').html('Perdu !')
                $('#bet').css({'visibility' : 'hidden', 'opacity' : '0'});
                play = false;
            }
// création d'une fonction décompte, si = à 0 s'arrête (fonction clearInterval arrête le décompte), affiche perdu et masque l'input , 
            else if (play){
                secondes--; 
// sinon tu décompte les secondes.
// secondes-- => peut s'écrire secondes = secondes - 1 et encore secondes -= 1
// c'est à dire que l'on retire 1 à la "var secondes".
                $('.chrono').html(secondes);
            }
            else{
                clearInterval(countDown);
                $('#bet').css({'visibility' : 'hidden', 'opacity' : '0'});
            }   
        }, 1000);
// la fonction chrono permet d'afficher du coup la "var secondes"-1 toutes les secondes grâce à la valeur 1000 milliseconde (= à 1s).      
    });

// partie qui permet de soumettre une proposition
    $('#bet').submit(function(event){
// la propriété event défini plus bas permet de prendre la main sur le formulaire et d'annuler ses actions prédéfini 
// je sélectionne mon formulaire est je lui soumais
        if (play){
            bets = $('#number').val();

            if (bets == figure) {
                $('.reponse').html('Gagné !')
                play = false;
            }
// si la valeur du paris ('var bets') et =à la valeur du nombre aléatoire à trouver ('var figure') alors on affiche 'gagné !' le gestionnaire d'évènement 'html'.
            else if (bets < figure) {
                $('.reponse').html('Plus !')
            }
// si la valeur du paris et plus petit que la valeur du nombre aléatoire à trouver alors on indique que sa valeur est plus grande en indiquant 'plus !'
            else {
                $('.reponse').html('Moins !') 
            }
// sinon (si cela ne correspond à aucune des deux conditions précédentes) on affiche 'mons !' pour signifier que la valeur du nombre alétoire à trouver est inférieur. 

            $('#number').val('')
        }
// permet de remettre à une valeur 'null' après avoir soumis une proposition.
        event.preventDefault();

    });

// compteur animé du nmobre d'essai au click ou à la validation d'une proposition

    $('#validate').click(function(){

        count++;
// j'ajoute +1 à la variable count à chaque click ou validation

// leave
        $('.count-leave').addClass('count-leave-active');
        setTimeout(function(){
            $('.count-leave').remove();
        }, 1000);
// au click sur le bouton valider (ciblé par id 'validate') on ajoute une class qui permet de faire disparaitre le chiffre 0 avec une transition css (voir feuille css).

// enter
        $('.count-enter').addClass('count-enter-active');
        setTimeout(function(){
            $('.count-enter').addClass('count-leave'). 
            removeClass('count-enter count-enter-active');
// au click sur le bouton valider (ciblé par id 'validate') on ajoute une class qui permet de faire apparaitre le chiffre 1 avec une transition css (voir feuille css).           
            $('.flex').append('<h2 class="marginLeft count-enter">'+ count +'</h2>')
// La méthode append() insère le contenu spécifié à la fin des éléments sélectionnés, ici la variable 'count' à laquelle j'ajoute plus un à chaque click(voir plus haut). 
        }, 1000);
// 1000 millisecondes est le temps de transition entre le comptage des essais.
       
    });

});

// voir https://www.youtube.com/watch?v=-O1mQIOPXvs
// et https://www.youtube.com/watch?v=gSwPup_de0c