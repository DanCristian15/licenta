<template>
<div>
    <div v-if="this.timerHours === 0 && this.timerMinutes === 0 && this.timerSeconds === 0 " >Sold out</div>
<p v-else>{{timerHours}} : {{timerMinutes}} : {{ timerSeconds }}</p>
</div>

</template>

<script>
    export default {
        name: 'Timer',

        data() {
            return {
                timerHours: 0,
                timerMinutes: 59,
                timerSeconds: 59,
                timerCount: 3000
            }
        },

        watch: {
            timerSeconds: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.timerSeconds--;
                        }, 1);
                    }

                    else if ( value === 0 ) {
                        if (this.timerHours ===  0 && this.timerMinutes === 0 ) {
                            console.log('gata');
                            this.timerSeconds =0;
                            this.timerMinutes =0;
                            this.timerHours =0;

                        }
                        else  {
                            setTimeout(() => {
                            this.timerSeconds--;
                        }, 1);
                        }
                    }

                    if(value < 0) {
                        this.timerMinutes--;
                        this.timerSeconds = 59;
                    }
                // console.log(this.timerHours, this.timerMinutes, this.timerSeconds)

                },
                immediate: true // This ensures the watcher is triggered upon creation
            },
            timerMinutes: {
                handler(value) {
                    if (value < 0) {
                        this.timerHours--;
                        this.timerMinutes = 59;
                    }
                // console.log(this.timerHours, this.timerMinutes, this.timerSeconds)

                },
                // immediate: true // This ensures the watcher is triggered upon creation
            }
        }
    }

</script>

<style lang="scss" scoped>
    .display-none {
        display: none!important;
        color: red;
    }

    .visible {
        display: flex;
    }
</style>