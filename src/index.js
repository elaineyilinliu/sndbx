import './styles/index.css';

import {
	THREE,
	Core,
	VRButton,
	GameObject,
	GameComponent,
	GameSystem,
	Types,
} from 'elixr';

const core = new Core(document.getElementById('scene-container'));

core.scene.background = new THREE.Color(0x505050);

const geometry = new THREE.PlaneGeometry(10, 10);
const material = new THREE.MeshStandardMaterial( {color: 0xfac6cc, side: THREE.DoubleSide} );
const floor = new THREE.Mesh( geometry, material );
core.scene.add( floor );
const wall = new THREE.Mesh(geometry, material);
core.scene.add(wall);
wall.position.set(-5,5,0);
floor.rotateX(Math.PI/2);
wall.rotateY(Math.PI/2);
const wall2 = wall.clone();
core.scene.add(wall2);
wall2.position.x = 5;

const ambientLight = new THREE.AmbientLight(0xccc1db, 0.2);
core.scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xd2efdb,0.9);
core.scene.add(directionalLight);



const bearHead = new GameObject();
core.addGameObject(bearHead);
bearHead.position.set(-0.6,2, -1.5);

const geometry1 = new THREE.SphereGeometry(0.5, 32, 16 );
const material1 = new THREE.MeshStandardMaterial( { color: 0xc5ab89 } );
const head = new THREE.Mesh( geometry1, material1 );
head.scale.set(1,1,0.8);
bearHead.add( head );

const sphere1 = new THREE.Mesh( new THREE.SphereGeometry(0.15, 32, 16 ), new THREE.MeshStandardMaterial( { color: 0xc5ab89 } ) );
sphere1.position.set(-0.3 ,0.4, 0)
bearHead.add( sphere1 );

const sphere2 = sphere1.clone();
sphere2.position.set(0.3,0.4,0)
bearHead.add(sphere2);

const eye1 = new THREE.Mesh( new THREE.SphereGeometry(0.04, 32, 16 ), new THREE.MeshStandardMaterial( { color: 0x000000 } ) );
eye1.position.set(-0.18 ,0.2, 0.35);
eye1.scale.set(1,1,0.1);
bearHead.add( eye1 );


const eye2 = eye1.clone();
eye2.position.x = 0.18;
bearHead.add(eye2);

class BearData extends GameComponent {}

BearData.schema = {
	angularVelocity: {type: Types.Number, default:0}
}

core.registerGameComponent(BearData)

const bearHead2 = bearHead.clone(true);
core.addGameObject(bearHead2);
bearHead2.position.x = 0.6

bearHead.addComponent(BearData, {angularVelocity: Math.PI/4});
bearHead2.addComponent(BearData, {angularVelocity:Math.PI/8})

// const angularSpeed = Math.PI/4;

class BearMovementSystem extends GameSystem {
	execute(delta, _time) {

		this.queryGameObjects('bearquery').forEach(bear=>{
			const bearData = bear.getComponent(BearData);
			bear.rotateY(bearData.angularVelocity * delta);
		})
		
	}
}

BearMovementSystem.queries = {
	bearquery: {components:[BearData]}
}

core.registerGameSystem(BearMovementSystem);


// create vr mode
const vrButton = document.getElementById('vr-button');
VRButton.convertToVRButton(vrButton, core.renderer, {
	VR_NOT_ALLOWED_TEXT: 'VR BLOCKED',
	VR_NOT_SUPPORTED_TEXT: 'VR UNSUPPORTED',
	onSessionStarted: () => {},
	onSessionEnded: () => {},
	onUnsupported: () => {
		vrButton.style.display = 'none';
	},
});

