module.exports = {
  format_date_time: (date) => {
    // Format date as MM/DD/YYYY
    const postDate = new Date(date);
    if(postDate == 'Invalid Date') {
      return 'No Current Messages';
    }
    return postDate.toLocaleString();
  },
};
