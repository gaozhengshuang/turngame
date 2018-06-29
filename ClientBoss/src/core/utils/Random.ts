module game {

    /*
    * 这个随机数发生器算法与服务端算法一致，相同的Seed，随机出来的随机数一摸一样
    */
    export class Random {
        private inext: number;
        private inextp: number;
        private SeedArray: Array<number> = [];
        private MBIG = 2147483647;
        private MSEED = 161803398;
        private MZ = 0;
        public constructor(Seed?: number) {
            if (!Seed)
                Seed = (new Date().valueOf() % 1000000) | 0;
            for (var i = 0; i < 56; i++)
                this.SeedArray.push(0);
            var num = (Seed == -2147483648) ? 2147483647 : (Math.abs(Seed) | 0);
            var num2 = 161803398 - num;
            this.SeedArray[55] = num2;
            var num3 = 1;
            for (var i = 1; i < 55; i++) {
                var num4 = (21 * i % 55) | 0;
                this.SeedArray[num4] = num3;
                num3 = num2 - num3;
                if (num3 < 0) {
                    num3 += 2147483647;
                }
                num2 = this.SeedArray[num4];
            }
            for (var j = 1; j < 5; j++) {
                for (var k = 1; k < 56; k++) {
                    this.SeedArray[k] -= this.SeedArray[1 + (k + 30) % 55];
                    if (this.SeedArray[k] < 0) {
                        this.SeedArray[k] += 2147483647;
                    }
                }
            }
            this.inext = 0;
            this.inextp = 21;
            Seed = 1;
        }

        private Sample(): number {
            return this.InternalSample() * 4.6566128752457969E-10;
        }

        private InternalSample(): number {
            var num = this.inext;
            var num2 = this.inextp;
            if (++num >= 56) {
                num = 1;
            }
            if (++num2 >= 56) {
                num2 = 1;
            }
            var num3 = this.SeedArray[num] - this.SeedArray[num2];
            if (num3 == 2147483647) {
                num3--;
            }
            if (num3 < 0) {
                num3 += 2147483647;
            }
            this.SeedArray[num] = num3;
            this.inext = num;
            this.inextp = num2;
            return num3;
        }

        public Next(minValue: number, maxValue: number): number {
            if (minValue == null && maxValue == null)
                return this.InternalSample();
            if (minValue > maxValue) {
                throw new Error("min > max");
            }
            var num = maxValue - minValue;
            if (num <= 2147483647) {
                return ((this.Sample() * num) | 0) + minValue;
            }
            return (((this.GetSampleForLargeRange() * num) | 0) + minValue) | 0;
        }

        private GetSampleForLargeRange(): number {
            var num: number = this.InternalSample();
            var flag = this.InternalSample() % 2 == 0;
            if (flag) {
                num = -num;
            }
            var num2 = num;
            num2 += 2147483646.0;
            return num2 / 4294967293.0;
        }
    }

}