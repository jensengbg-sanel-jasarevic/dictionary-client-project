<template>
    <div id="footer">
        <p>Follow us on: </p>
        <div class="tooltip">
      <i class="fab fa-facebook" aria-hidden="true" ></i>
      <span class="tooltiptext">Facebook</span>
      </div>
      <div class="tooltip">
      <i class="fab fa-instagram" aria-hidden="true" data-title="Instagram"></i>
      <span class="tooltiptext">Instagram</span>
     </div>
     <div class="tooltip">
      <i class="fab fa-linkedin" aria-hidden="true" data-title="LinkedIn"></i>
      <span class="tooltiptext">LinkedIn</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "../style/common";
#footer{
  background-color: rgb(5, 2, 2);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
}
i {
    margin-top: 15px;
    margin-left: 10px;
}
</style>