import{getResources} from "./resources";
function changeRemainig(remainig,max,cur, i=0){
    getResources('http://localhost:3000/words');
        remainig.textContent=`Remainig cards ${(max-cur)+i}`;
    return max;
}
export{changeRemainig};