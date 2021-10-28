<template>
    <div class="keyboard">
        <div class="keyboard__numbers">
            <div
                v-for="(num, i) in nums"
                :key="`num-${i}`"
                class="keyboard__item"
            >
                <el-button
                    type="warning"
                    circle
                    @click="$emit('number', num)"
                >{{ num }}</el-button>
            </div>
        </div>
        <div class="keyboard__operators">
            <div
                v-for="(operator, i) in operators"
                :key="`operator-${i}`"
                class="keyboard__item"
            >
                <el-button
                    type="info"
                    circle
                    @click="$emit('operator', operator)"
                >{{ operator }}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GameKeyboard',
  data () {
    return {
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      operators: [
        '←',
        '<',
        '>',
        '='
      ]
    }
  }
}
</script>

<style scoped lang="less">
.keyboard {
    display: flex;
    margin: 20px auto 0;

    &__numbers {
        display: flex;
        flex-wrap: wrap;
        width: 152px;
        min-width: 152px;
        justify-content: center;
    }

    &__operators {
        margin-left: 15px;
        width: 40px;
    }

    &__item {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        margin-bottom: 15px;

        &:nth-child(3n + 3) {
            margin-right: 0;
        }
        &:nth-last-child(1) {
            margin-right: 0;
        }

        button {
            width: 30px;
            height: 30px;
            min-width: 40px;
        }
    }
}
</style>
