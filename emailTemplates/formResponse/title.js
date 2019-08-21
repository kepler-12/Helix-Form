module.exports = ({formName}) => {
  return `
  
  <!-- get data for the program title/type -->
  <div style="background-color: #14a7ae;margin-top:-9px;">
    <h2 style="color: white;margin:0;padding:20px;text-align:center;">${formName}</h2>
  </div>

  <!-- get data for the store name and subtitle/header -->
  <div style="background-color: #f2f2f2;  text-align: center; padding:20px;">
    <div style="">
      <h1 style="color: #074a74;">${formName}</h1>
      <h3 style="color: dimgrey;font-weight:lighter;">New Entry for ${formName}</h3>
    </div>

  `
}
