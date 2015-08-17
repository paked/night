var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
    console.log("preloading...");
    game.load.image('player', 'assets/player.png');
    game.load.image('platform', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
}

// entities
var player;
var platforms;
var stars;
var scoreText;

// controls
var cursors;
var jumpButton;

// meta vars
var jumpTime = 0;
var points = 0;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 250;

    game.stage.backgroundColor = '#72C257';

    player = game.add.sprite(0, 0, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.05;
    player.body.collideWorldBounds = true;

    platforms = this.add.physicsGroup();
    platforms.create(100, 200, 'platform');
    platforms.create(200, 200, 'platform');
    platforms.create(300, 250, 'platform');
    platforms.create(400, 250, 'platform');
    platforms.create(200, 400, 'platform');

    platforms.setAll('body.allowGravity', false);
    platforms.setAll('body.immovable', true);

    stars = this.add.physicsGroup();
    stars.create(125, 170, 'star');
    stars.create(315, 150, 'star');
    stars.create(410, 150, 'star');
    stars.create(205, 350, 'star');

    stars.setAll('body.allowGravity', false);

    scoreText = game.add.text(0, 0, _pointsText());

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

// returns a string telling the user how many points they have!
function _pointsText() {
    return "you have " + points + " point(s)";
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, stars, incrementScore);

    scoreText.text = _pointsText();

    game.backgroundColor = '#ff0000';

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -120;
    }

    if (cursors.right.isDown) {
        player.body.velocity.x = 120;
    }

    if (cursors.up.isDown && (player.body.touching.down || player.body.onFloor()) && game.time.now > jumpTime) {
        player.body.velocity.y = -170;
        jumpTime = game.time.now + 750;
    }
}

function incrementScore(p, s) {
    s.kill();
    points += 1;
}
