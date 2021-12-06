<template>
<transition name="popUp-fade">
  <div class="popUp-backdrop">
    <div class="popUp">
      <header class="popUp-header">
       <slot name="header">
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="popUp-body">
        <slot name="body">
         
        </slot>
       </section>

      <footer class="popUp-footer">
       <button
        type="button"
         class="primaryButton" tabindex="0"
          @click="ok"
        >
         <slot name="okText">
        </slot>
        </button>
         <button
          type="button"
          class="secondaryButton" tabindex="0"
          @click="cancel"
        >
         <slot name="cancelText">
        </slot>
        </button>
      </footer>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    name: 'Popup',
    methods: {
      close() {
        this.$emit('close');
      },
      ok() {
        this.$emit('ok');
      },
      cancel() {
        this.$emit('cancel');
      },
    },
  };
</script>

<style lang="scss" scoped>
@import "../style/common";

.popUp-fade-enter,
  .popUp-fade-leave-to {
    opacity: 0;
  }

  .popUp-fade-enter-active,
  .popUp-fade-leave-active {
    transition: opacity .5s ease;
  }

  .popUp-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popUp {
    position: inherit;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 1000px;
    max-height: 500px;
  }

  .popUp-header,
  .popUp-footer {
    padding: 15px;
    display: flex;
  }

  .popUp-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #fff;
    justify-content: space-between;
     background: #303533;
  }

  .popUp-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: row;
    justify-content: space-around;
    justify-items: center;
  }

  .popUp-body {
    position: relative;
    overflow: auto;
    margin: 10px 10px 10px 10px;
     max-width: 1000px;
    max-height: 500px;
    justify-content: center;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    background: transparent;
  }
  
  @media screen and (max-width: 600px) {
.popUp {
    overflow-x: auto;
    overflow-y: auto;
    font-size: 10px;
    max-width: 300px;
    max-height: 300px;
  }
  .popUp-body {
    position: relative;
    overflow: auto;
    margin: 10px 10px 10px 10px;
      max-width: 250px;
    max-height: 250px;
    font-size: 10px;
  }
   .popUp-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: space-between;
    justify-items: center;
  }
  }
</style>