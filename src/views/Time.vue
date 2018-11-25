<template>
    <div>
        <div v-if="active" class="timer-wrapper">
            <Timer class="full-screen-timer" :due-time="active.dueTime" :start-time="active.startTime" :state="active.state"/>
        </div>
    </div>
</template>

<script>
    import Timer from "../components/Timer.vue";
    import firebase from "../lib/firebase";

    const db = firebase.database();
    const activeRef = db.ref('active');

    export default {
        name: 'Time',
        components: {
            Timer,
        },
        mounted(){
            activeRef.on('value',snapshot=>{
                this.active = snapshot.val()
            })
        },
        data(){
            return {
                active: null
            }
        }
    }
</script>

<style lang="scss">
    .timer-wrapper {
        position:relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .full-screen-timer {
        color: var(--red);

        .time {
            font-size: 40vh;
        }
        .state {
            font-size: 15vh;
        }
    }
</style>