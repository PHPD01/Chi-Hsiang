let starIcon = document.querySelectorAll('.commentStar i');
for (let i = 0; i < starIcon.length; i++) {
  starIcon[i].addEventListener(
    'click',
    function(event) {
      event.preventDefault();
      console.log('preventDefault will stop you from checking this checkbox!');
      console.log(this);
      for (let j = 0; j <= i; j++) {
        starIcon[j].classList.add('bg-danger');
        console.log('第 ' + j + ' 號星 加上紅色');
      }
      for (let k = 4; k > i; k--) {
        starIcon[k].classList.remove('bg-danger');
        console.log('第 ' + k + ' 號星 去除紅色');
      }
      var starNumber = i + 1; // starNumber = 傳到資料庫的星數
      console.log('評論星數為 ' + starNumber);
    },
    false
  );
}