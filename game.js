var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
    console.log("preloading...");
    game.load.image('player', 'assets/player.png');
    game.load.image('platform', 'assets/platform.png');
}

var player;
var platforms;
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

    platforms = this.add.physicsGroup();
    platforms.create(200, 200, 'platform');

    platforms.setAll('body.allowGravity', false);
    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.backgroundColor = '#ff0000';

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -200;
    }

    if (cursors.right.isDown) {
        player.body.velocity.x = 200;
    }

    if (cursors.up.isDown && (player.body.touching.down || player.body.onFloor()) && game.time.now > jumpTime) {
        player.body.velocity.y = -150;
        jumpTime = game.time.now + 750;
    }
}
