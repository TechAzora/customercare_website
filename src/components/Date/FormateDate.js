const formatDate = (dateString) => {
  const options = {
    weekday: "short", 
    year: "numeric",  
    month: "short",   
    day: "2-digit",   
    hour: "2-digit",  
    minute: "2-digit", 
    hour12: true      
  };

  return new Date(dateString).toLocaleString(undefined, options);
};

export default formatDate;
