"use strict";


window.addEventListener('DOMContentLoaded',()=>{
    const getResources = async(url)=>{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`We can't fetch ${url},status ${res.status}`);
        }
        return await res.json();
    };
    function changeRemainig(i=0){
        getResources('http://localhost:3000/words')
        .then(data=> {
            max=data.length-1;
            remainigBtn.textContent=`Remainig cards ${(max-cur)+i}`;
            console.log(remainigBtn.textContent=`Remainig cards ${(max-cur)+i}`);
            console.log(max);}
            );
        
    }
    function generateArrayRandomNumber (min, max) {
        let totalNumbers 		= max - min + 1,
            arrayTotalNumbers 	= [],
            arrayRandomNumbers 	= [],
            tempRandomNumber;
    
        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + min);
        }
    
        while (arrayTotalNumbers.length) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
        }
    
        return arrayRandomNumbers;
    }
    //Adding cards
    function addCards(){
        document.querySelector('.quote').innerHTML=``;
        getResources('http://localhost:3000/words')
        .then( data=>{
        let rand = generateArrayRandomNumber(0,data.length-1);
        for(let i = 0; i<data.length-1;i++){
          let {rus,jap} = data[rand[i]];
          const card =  document.createElement('div');
          card.classList.add('card');
          card.innerHTML=`<div class="front">${jap}</div>
          <div class="back hide">${rus}</div>`;
          document.querySelector('.quote').append(card);
        }
        cards = document.querySelectorAll('.card');
        frontCards = document.querySelectorAll('.front'),
        backCards = document.querySelectorAll('.back');
        });
    }
    let cards,
        frontCards,
        backCards;
    let cur=0,
    max,
    known=0,
    dknown=0,
    knownC,
    dknownC;
    const startBtn = document.querySelector('[data-start]'),
          remainigBtn = document.querySelector('[data-remainig]'),
          flipBtn = document.querySelector('[data-flip]'),
          knowBtn =document.querySelector('[data-k]'),
          dknowBtn = document.querySelector('[data-dk]'),
          retryBtn = document.querySelector('[data-retry]'),
          restartBtn = document.querySelector('[data-restart]');
        addCards();
    startBtn.addEventListener('click',()=>{
        cards[cur].style.display='block';
        changeRemainig(cur);
    });
    flipBtn.addEventListener('click',()=>{
                if(frontCards[cur].classList.contains('hide')){
                    frontCards[cur].classList.remove('hide');
                    backCards[cur].classList.add('hide');
                }
                else{
                    backCards[cur].classList.remove('hide');
                    frontCards[cur].classList.add('hide');
                }
        });
    knowBtn.addEventListener('click',()=>{
        known++;
        if(cur!=max-1){
        cards[cur].style.display='none';
        cur++;
        cards[cur].style.display='block';
        changeRemainig();
        knownC=1;
        dknownC=0;
        console.log(known);

        }
        else{
            if(known>localStorage.getItem('BestKnown', known)){
                localStorage.setItem('BestKnown', known);
            }
            modal('.modal');}
    });
    dknowBtn.addEventListener('click',()=>{
        dknown++;
        if(cur!=max-1){
        cards[cur].style.display='none';
        cur++;
        cards[cur].style.display='block';
        changeRemainig(1);
        knownC=0;
        dknownC=1;
        console.log(dknown);
        }
        else{
            if(known>localStorage.getItem('BestKnown', known)){
                localStorage.setItem('BestKnown', known);
            }
            modal('.modal');}
    });
    retryBtn.addEventListener('click',()=>{
        if(cur!=0){
            if(knownC==1){
                cards[cur].style.display='none';
                cur--;
                cards[cur].style.display='block';
                known--;
            }else{
                cards[cur].style.display='none';
                cur--;
                cards[cur].style.display='block';
                dknown--;
            }
            changeRemainig();
        }
    });
    restartBtn.addEventListener('click',()=>{
        known=0;
        dknown=0;
        cards[cur].style.display='none';
        cur=0;
        cards[cur].style.display='block';
        modal('.modal');
        addCards();
        changeRemainig();
    });

// Modal
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
    modal.innerHTML=`<div class="modal__dialog">
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
    openModal(modalSelector)
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
        changeRemainig();
    });

}
});