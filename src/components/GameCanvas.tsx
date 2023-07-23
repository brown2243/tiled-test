import Phaser from "phaser";
import React, { useEffect, useRef } from "react";
import mapImg from "src/assets/map.png";
// import mapImg from "../assets/map.png";

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
      constructor() {
        super("test");
      }

      preload() {
        this.load.setBaseURL("https://labs.phaser.io");

        this.load.image("tiles", "assets/tilemaps/iso/iso-64x64-outside.png");
      }

      create() {
        const mapData = new Phaser.Tilemaps.MapData({
          width: 10,
          height: 10,
          tileWidth: 64,
          tileHeight: 32,
          // @ts-ignore
          orientation: Phaser.Tilemaps.Orientation.ISOMETRIC,
          format: Phaser.Tilemaps.Formats.ARRAY_2D,
        });

        const map = new Phaser.Tilemaps.Tilemap(this, mapData);

        const tileset = map.addTilesetImage("iso-64x64-outside", "tiles");
        {
          if (!tileset) {
            return;
          }

          const layer = map.createBlankLayer("layer", tileset, 350, 200);
          if (!layer) {
            return;
          }
          const data = [
            [10, 11, 12, 13, 14, 15, 16, 10, 11, 12],
            [13, 11, 10, 12, 12, 15, 16, 10, 16, 10],
            [12, 10, 16, 13, 14, 15, 16, 16, 13, 12],
            [10, 11, 12, 13, 14, 15, 16, 10, 11, 12],
            [13, 11, 10, 12, 12, 15, 16, 10, 16, 10],

            [12, 10, 16, 13, 14, 15, 16, 16, 13, 12],
            [10, 11, 12, 13, 14, 15, 16, 10, 11, 12],
            [13, 11, 10, 12, 12, 15, 16, 10, 16, 10],
            [12, 10, 16, 13, 14, 15, 16, 16, 13, 12],
            [10, 11, 12, 13, 14, 15, 16, 10, 11, 12],
          ];

          let y = 0;

          data.forEach((row) => {
            row.forEach((tile, x) => {
              layer.putTileAt(tile, x, y);
            });

            y++;
          });
        }

        {
          if (!tileset) {
            return;
          }
          const layer = map.createBlankLayer("layer2", tileset, 350, 200);
          if (!layer) {
            return;
          }
          const data = [
            [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            [20, 20, 20, 270, 20, 20, 20, 20, 20, 20],

            [20, 20, 20, 20, 280, 20, 20, 20, 20, 20],
            [20, 20, 20, 20, 20, 290, 20, 20, 20, 20],
            [20, 20, 20, 20, 20, 20, 300, 20, 20, 20],
            [20, 20, 20, 20, 20, 20, 20, 310, 20, 20],
            [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
          ];

          let y = 0;

          data.forEach((row) => {
            row.forEach((tile, x) => {
              layer.putTileAt(tile, x, y);
            });

            y++;
          });
        }

        const tileset2 = map.addTilesetImage(mapImg, "tiles2");
        {
          if (!tileset2) {
            return;
          }
          const layer = map.createBlankLayer("layer3", tileset2, 350, 200);
          if (!layer) {
            return;
          }
          const data = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ];

          let y = 0;

          data.forEach((row) => {
            row.forEach((tile, x) => {
              layer.putTileAt(tile, x, y);
            });

            y++;
          });
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
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
