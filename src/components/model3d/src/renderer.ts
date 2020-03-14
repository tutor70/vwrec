import * as BABYLON from 'babylonjs';
import { IAnimationKey } from 'babylonjs/Animations/animationKey';

export default class Renderer {
    private _canvas!: HTMLCanvasElement;

    private _engine!: BABYLON.Engine;

    private _scene!: BABYLON.Scene;

    // private _captureFrame = 0;

    private _currentTime = 0;

    createScene (canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
      this._canvas = canvas;

      this._engine = engine;

      // This creates a basic Babylon Scene object (non-mesh)
      const scene = new BABYLON.Scene(engine);
      this._scene = scene;

      // This creates and positions a free camera (non-mesh)
      const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

      // This targets the camera to scene origin
      camera.setTarget(BABYLON.Vector3.Zero());

      // This attaches the camera to the canvas
      camera.attachControl(canvas, true);

      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;

      // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
      const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);

      // Move the sphere upward 1/2 its height
      sphere.position.y = 1;

      // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
      BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

      const animationBox = new BABYLON.Animation('myAnimation', 'scaling.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

      // An array with all animation keys
      const keys: IAnimationKey[] = [];

      // At the animation key 0, the value of scaling is "1"
      keys.push({
        frame: 0,
        value: 1
      });

      // At the animation key 20, the value of scaling is "0.2"
      keys.push({
        frame: 50,
        value: 0.5
      });

      // At the animation key 100, the value of scaling is "1"
      keys.push({
        frame: 100,
        value: 1
      });

      animationBox.setKeys(keys);
      const box1 = BABYLON.Mesh.CreateBox('Box1', 2.0, scene);
      box1.position.x = -1;
      sphere.animations = [];
      sphere.animations.push(animationBox);
      scene.beginAnimation(sphere, 0, 100, true);
      // require('@/server/framerender');
      // require('@/server/videocreatror');
    }

    initialize (canvas: HTMLCanvasElement) {
      const engine = new BABYLON.Engine(canvas, true);
      this.createScene(canvas, engine);

      engine.runRenderLoop(() => {
        const time = performance.now();
        if (time - this._currentTime < 33) {
          return;
        }
        this._currentTime = time;

        this._scene.render();

        // var r = new XMLHttpRequest();
        // r.open('POST', 'http://localhost:3999/' + this._captureFrame++, true);
        // var blob = this.dataURItoBlob(this._canvas.toDataURL());
        // r.send(blob);
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });
    }

    dataURItoBlob (dataURI: string) {
      const mimetype = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const byteString = atob(dataURI.split(',')[1]);
      const u8a = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        u8a[i] = byteString.charCodeAt(i);
      }
      return new Blob([u8a.buffer], { type: mimetype });
    }
}
