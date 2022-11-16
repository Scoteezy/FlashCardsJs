 //Resources
    // getting resources from db
    const getResources = async(url)=>{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`We can't fetch ${url},status ${res.status}`);
        }
        return await res.json();
    };
    //Random numbers
    function generateArrayRandomNumber (min, max) {
        let totalNumbers = max - min + 1,
            arrayTotalNumbers = [],
            arrayRandomNumbers = [],
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
    export{getResources};
    export{generateArrayRandomNumber};