import { Component, Prop, Vue } from 'vue-property-decorator';
import Renderer from '@/components/model3d/src/renderer';

@Component({})
export default class App3d extends Vue {
    @Prop() private msg!: string;

    // Initial data can be declared as instance properties
    message = 'Hello!';
    //
    // // Component methods can be declared as instance methods
    // onClick (): void {
    //
    // }

    mounted (): void {
      const canvas = this.$el.querySelector('#render-canvas');
      if (canvas !== null) {
        const renderer = new Renderer();
        renderer.initialize(canvas as HTMLCanvasElement);
      }
    }
}
