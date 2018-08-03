class DateHandler {
    createDateData(minDateArray,maxDateArray){
        let date = [];

        const nowTime = new Date();
        let minYear =  nowTime.getFullYear();
        let minMonth = nowTime.getMonth();
        let minDay = nowTime.getDate();

        if (minDateArray && minDateArray.length == 3) {
            minYear = parseInt(minDateArray[0]);
            if (parseInt(minDateArray[1]) > 0) {
                minMonth = parseInt(minDateArray[1])-1;
            }
            minDay = parseInt(minDateArray[2]);
        };

        for(let i=minYear;i<2080;i++){
            let month = [];
            if (i === minYear) {
                for(let j = minMonth + 1;j<13;j++){
                    let day = [];
                    if (j == minMonth + 1) {
                        if(j === 2){
                            for(let k=minDay;k<29;k++){
                                day.push(k+'日');
                            }
                            if((i%4 === 0 && i%100 != 0) || i%400 === 0 )  {
                                day.push(29+'日');
                            }
                        }else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                            for(let k=minDay;k<32;k++){
                                day.push(k+'日');
                            }
                        }else{
                            for(let k=minDay;k<31;k++){
                                day.push(k+'日');
                            }
                        }
                    }else{
                        if(j === 2){
                            for(let k=1;k<29;k++){
                                day.push(k+'日');
                            }
                            if((i%4 === 0 && i%100 != 0) || i%400 === 0 )  {
                                day.push(29+'日');
                            }
                        }
                        else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                            for(let k=1;k<32;k++){
                                day.push(k+'日');
                            }
                        }
                        else{
                            for(let k=1;k<31;k++){
                                day.push(k+'日');
                            }
                        }
                    }
                    let _month = {};
                    _month[j+'月'] = day;
                    month.push(_month);
                }
            }else{
                for(let j = 1;j<13;j++){
                    let day = [];
                    if(j === 2){
                        for(let k=1;k<29;k++){
                            day.push(k+'日');
                        }
                        if((i%4 === 0 && i%100 != 0) || i%400 === 0 )  {
                            day.push(29+'日');
                        }
                    }
                    else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                        for(let k=1;k<32;k++){
                            day.push(k+'日');
                        }
                    }
                    else{
                        for(let k=1;k<31;k++){
                            day.push(k+'日');
                        }
                    }
                    let _month = {};
                    _month[j+'月'] = day;
                    month.push(_month);
                }
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    createTimeData(selectedDay){
        const nowTime = new Date();
        const d1 = nowTime.getFullYear()
        const d2 = nowTime.getMonth() + 1
        const d3 = nowTime.getDate()

        const currentDay = d1 + '-' + (d2 < 10 ? '0'+d2 : d2) + '-' + (d3 < 10 ? '0'+d3 : d3)
        let timeData = [];
        let currentHour = nowTime.getHours()
        let currentMin = nowTime.getMinutes()
        if (selectedDay != currentDay) {
            currentHour = 0
            currentMin = 0
        }
        for (let i = currentHour; i < 24; i++) {
            const minute = []
            if (i == currentHour) {
                for (let i = currentMin; i < 60; i++) {
                    minute.push((i < 10 ? '0' : '') + parseInt(i) +'分')
                };
            }else{
                for (let i = 0; i < 60; i++) {
                    minute.push((i < 10 ? '0' : '') + parseInt(i) +'分')
                };
            }
            const obj = {}
            obj[(i < 10 ? '0' : '') + parseInt(i) + '时'] = minute

            timeData.push(obj)
        };
        return timeData
    }
}

export default new DateHandler();


/*
* 一般结合 react-native-picker-custom 使用
* 使用：pickerData: type==='date' ? DateHandler.createDateData() : DateHandler.createTimeData(date)
*/