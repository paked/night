var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
    console.log("preloading...");
    game.load.image('player', 'assets/player.png');
}

var player;
var cursors;
var jumpButton;
var jumpTime = 0;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 200;

    game.stage.backgroundColor = '#72C257';

    player = game.add.sprite(0, 0, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.05;
    player.body.collideWorldBounds = true;


    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    game.backgroundColor = '#ff0000';

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -200;
    }

    if (cursors.right.isDown) {
        player.body.velocity.x = 200;
    }

    if (cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTime) {
        player.body.velocity.y = -150;
        jumpTime = game.time.now + 750;
    }
}
