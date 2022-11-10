module.exports = {
  format_date_time: (date) => {
    // Format date as MM/DD/YYYY
    const postDate = new Date(date);
    return postDate.toLocaleString();
  },
};
