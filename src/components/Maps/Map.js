import React from 'react'
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { MAPS_KEY } from '../../config';

export default function Map(props) {
	const google = window.google;
	const [libraries] = React.useState(['places']);
	const [directions, setDirections] = React.useState();

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: MAPS_KEY,
		libraries: libraries
	})

	const containerStyle = {
		width: '100%',
		height: '40vh',
		borderRadius: '10px'
	};

	const getDirections = async () => {
		if (props.directions !== [] && props.directions !== undefined && props.directions !== null && props.directions.length > 0) {
			let origin = props.directions[0];
			let destinations = props.directions[props.directions.length - 1];
			let waypoints = [];

			for (let i = 1; i < props.directions.length - 1; i++) {
				waypoints.push({
					location: {
						lat: Number(props.directions[i].latitude),
						lng: Number(props.directions[i].longitude)
					},
					stopover: true
				})
			};

			const directionsService = new google.maps.DirectionsService();
			const results = await directionsService.route({
				origin: {
					lat: Number(origin.latitude),
					lng: Number(origin.longitude)
				},
				destination: {
					lat: Number(destinations.latitude),
					lng: Number(destinations.longitude)
				},
				waypoints: waypoints,
				travelMode: google.maps.TravelMode.DRIVING,
			});
			
			results.data = props.directions[0].data;
			results.consumo = props.directions[0].consumo;
			results.gasolina = props.directions[0].gasolina;
			results.nome_funcionario = props.directions[0].nome_funcionario;
			results.nome_cidade = props.directions[0].nome_cidade;

			props.responseMap(results);
			setDirections(results);

			let dist = 0;
			results.routes[0].legs.forEach((item) => {
				dist += item.distance.value;
			});
			props.distance(dist);
		}
	}

	React.useEffect(() => {
		getDirections();
	}, [props.directions]);

	return (
		<>
			{
				props.renderMap &&
					<div>
						{
							props.directions.length > 0 && isLoaded ? (
								<GoogleMap
									mapContainerStyle={containerStyle}
									center={{
										lat: Number(props.directions[0].latitude),
										lng: Number(props.directions[0].longitude)
									}}
									zoom={15}
								>
									{
										props.directions !== [] &&
										<DirectionsRenderer directions={directions} />
									}
								</GoogleMap>
							) : <></>
						}
					</div>
			}
		</>
	)
}