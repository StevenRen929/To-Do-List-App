export default function formatDate(dateTimeString) {
    //reference to gpt
 const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/;
const match = dateTimeString.match(regex); 
   
      const year = match[1];
      const month = match[2];
      const day = match[3];
      const hour = match[4];
      const minute = match[5];
      const second = match[6] || '00';  
      let formattedDate = `${day}/${month}/${year},${hour}:${minute}:${second}`;
  

return formattedDate;
}



