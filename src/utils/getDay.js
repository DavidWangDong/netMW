const riliList = ['rili','rili1','rili3','rili2','rili4','rili13','rili5','rili6','rili8','rili10','rili7','rili9','rili11','rili12','rili14','rili16','rili15','rili17','rili18','rili20','rili19','rili22','rili24','rili21','rili23','rili26','rili25','rili28','rili27','rili30','rili29']


export default function getDateIcon (day){
    if (day-1>=0){
        return riliList[day-1]
    }
    const currDay = new Date().getDate();
    console.log(riliList[currDay - 1]);
    return riliList[currDay-1]; 
}