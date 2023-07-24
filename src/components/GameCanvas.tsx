import Phaser from "phaser";
import React, { useEffect, useRef } from "react";
import isoJSON from "src/assets/iso.json";
import mapImg from "src/assets/map.png";
import mapImg2 from "src/assets/map2.png";

const TAG_ID = "phaser-canvas";
export default function GameCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // https://github.com/ourcade/phaser3-vite-template
    // https://labs.phaser.io/assets/tilemaps/iso/iso-64x64-outside.png
    // https://labs.phaser.io/view.html?src=src\tilemap\isometric\create%20isometric%20manually.js
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/tilemap/isometric/create%20isometric%20manually.js

    if (ref.current) {
      const canvas = ref.current.querySelector("canvas");
      if (canvas) {
        ref.current.removeChild(canvas);
      }
    }

    class Example extends Phaser.Scene {
      controls: any;
      constructor() {
        super("test");
      }

      preload() {
        // this.load.setBaseURL("https://labs.phaser.io");
        // //
        // this.load.image("tiles", "assets/tilemaps/iso/iso-64x64-outside.png");
        // //
        this.load.image("map", mapImg);
        this.load.image("map2", mapImg2);

        this.load.tilemapTiledJSON("iso-map", isoJSON);
      }

      create() {
        const map = this.make.tilemap({ key: "iso-map" });

        const mapTiles = map.addTilesetImage("map", "map");
        const map2Tiles = map.addTilesetImage("map2", "map2");

        if (!mapTiles || !map2Tiles) {
          return;
        }

        map.createLayer("pipe", [mapTiles, map2Tiles]);
        map.createLayer("pipe2", [mapTiles, map2Tiles]);
        map.createLayer("digital", [mapTiles, map2Tiles]);
        map.createLayer("container", [mapTiles, map2Tiles]);

        const cursors = this.input?.keyboard?.createCursorKeys();
        if (cursors) {
          this.cameras.main.setZoom(1);

          const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.7,
          };

          this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
            controlConfig
          );
        }
      }

      update(time: any, delta: any) {
        this.controls.update(delta);
      }
    }

    const config = {
      type: Phaser.WEBGL,
      width: 1200,
      height: 1000,
      backgroundColor: "#2d2d2d",
      parent: TAG_ID,
      pixelArt: true,
      scene: Example,
    };

    new Phaser.Game(config);
  }, []);

  return (
    <div>
      <div id={TAG_ID} ref={ref}></div>
    </div>
  );
}
