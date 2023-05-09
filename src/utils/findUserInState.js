export const findItemInState =(userId,itemList)=>{   
        for (let i = 0; i < itemList.length; i++) {
            if (userId === itemList[i].id) {
                return i;
            }
        }   
    }