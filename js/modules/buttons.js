import{changeRemainig} from "./cards";
import{getResources,generateArrayRandomNumber} from "./resources";
let known=0;
let dknown=0;
function buttons({startBtn,flipBtn,knowBtn,dknowBtn,retryBtn,restartBtn,remainigBtn}){
//Adding cards
 function addCards(){
    document.querySelector('.quote').innerHTML=``;
    getResources('http://localhost:3000/words')
    .then( data=>{
    max = data.length-1;
    console.log(max);
    let rand = generateArrayRandomNumber(0,max);
    for(let i = 0; i<max;i++){
      let {rus,jap} = data[rand[i]];
      const card =  document.createElement('div');
      card.classList.add('card');
      card.innerHTML=`<div class="front">${jap}</div>
      <div class="back hide">${rus}</div>`;
      document.querySelector('.quote').append(card);
    }
    cards = document.querySelectorAll('.card');
    frontCards = document.querySelectorAll('.front');
    backCards = document.querySelectorAll('.back');
    });
}
let cards,frontCards,backCards;
let max;
let knownC;
let dknownC;    
        // Last cards
const startButton = document.querySelector(startBtn);
const flipButton = document.querySelector(flipBtn);
const knowButton =document.querySelector(knowBtn);
const dknowButton = document.querySelector(dknowBtn);
const retryButton = document.querySelector(retryBtn);
const restartButton = document.querySelector(restartBtn);
const remainigButton = document.querySelector(remainigBtn);
let cur=0;
addCards();
startButton.addEventListener('click',()=>{
        cards[cur].style.display='block';
        max =changeRemainig(remainigButton,max,cur);
    });

    flipButton.addEventListener('click',()=>{
            if(frontCards[cur].classList.contains('hide')){
                frontCards[cur].classList.remove('hide');
                backCards[cur].classList.add('hide');
            }
            else{
                backCards[cur].classList.remove('hide');
                frontCards[cur].classList.add('hide');
            }
    });

    knowButton.addEventListener('click',()=>{
    known++;
    if(cur!=max-1){
    cards[cur].style.display='none';
    cur++;
    cards[cur].style.display='block';
    max =changeRemainig(remainigButton,max,cur);
    knownC=1;
    dknownC=0;
    console.log(known);

    }
    else{
        if(known>localStorage.getItem('BestKnown', known)){
            localStorage.setItem('BestKnown', known);
        }
        modal('.modal');
    }
});

dknowButton.addEventListener('click',()=>{
    dknown++;
    if(cur!=max-1){
    cards[cur].style.display='none';
    cur++;
    cards[cur].style.display='block';
    max = changeRemainig(remainigButton,max,cur);
    knownC=0;
    dknownC=1;
    }
    else{
        if(known>localStorage.getItem('BestKnown', known)){
            localStorage.setItem('BestKnown', known);
        }
        modal('.modal');
    }

});

retryButton.addEventListener('click',()=>{
    if(cur!=0){
        cards[cur].style.display='none';
        cur--;
        cards[cur].style.display='block';
        if(knownC==1){
            known--;
        }else{
            dknown--;
        }
        max =changeRemainig(remainigButton,max,cur);

    }
});
function restart(){
    addCards();
    known=0;
    dknown=0;
    cards[cur].style.display='none';
    cards[0].style.display='block';
    modal('.modal');
    max =changeRemainig(remainigButton,max,cur);
}
restartButton.addEventListener('click',restart);
function openModal(modalSelector){
    const  modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove('hide');
    document.body.style.overflow='hidden';
}
function closeModal(modalSelector){
    const  modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove('show');
    document.body.style.overflow='';
}
function modal(modalSelector){
    
    const modal = document.querySelector(modalSelector);
    modal.innerHTML=`
    <div class="modal__dialog">
        <div class="modal__content">
            <form action="#">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">Last attemp you:</div>
                <p class="learned">Learned ${known} </p>
                <p class="dlearned">Didn't learnded ${dknown} </p>
                <p class="best__result">Best result is: ${localStorage.BestKnown} learned words: </p>
                <button data-btntry class="btn btn_dark btn_min">Try again</button>
            </form>
        </div>
    </div>`;
    
    openModal(modalSelector);
    modal.addEventListener('click',(e)=>{
        if(e.target===modal || e.target.getAttribute('data-close')==""){
            closeModal(modalSelector);
        }
        
    });

    document.addEventListener('keydown',(e)=>{
    if(e.code==='Escape' &&modal.classList.contains('show')){
        closeModal(modalSelector);
    } 
    });

    document.querySelector('[data-btntry]').addEventListener('click',(e)=>{
        e.preventDefault();
        closeModal(modalSelector);
        known=0;
        dknown=0;
        cards[cur].style.display='none';
        cur=0;
        cards[cur].style.display='block';
        max = changeRemainig(remainigButton,max,cur);

    });

}
}
export default buttons;