import { useJsApiLoader } from '@react-google-maps/api';
import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import { MAPS_KEY } from '../../../config';
import useForm from '../../../hooks/useForm';
import Input from '../Input';

const InputAddress = (props) => {
    const latitude = useForm();
    const longitude = useForm();
    const endereco = useForm();
    const [libraries] = React.useState(['places']);
    const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: MAPS_KEY,
		libraries: libraries
	})

    React.useEffect(() => {
        if(props.hasInitialValues){
            latitude.setValue(props.sendToChildLatitude);
            longitude.setValue(props.sendToChildLongitude);
            endereco.setValue(props.sendToChildAddress);
        }
    }, [])

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        endereco.setValue(value);
        latitude.setValue(latLng.lat);
        longitude.setValue(latLng.lng);

        props.sendToParentLatitude(latLng.lat);
        props.sendToParentLongitude(latLng.lng);
        props.sendToParentAddress(value);
    };

    return (
        <>
            {
                isLoaded &&
                <>
                    <PlacesAutocomplete
                        value={endereco.value}
                        onChange={endereco.setValue}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <label>Endereço</label>
                                <input className="" {...getInputProps({ placeholder: "Digite um endereço" })}/>

                                <div>
                                    {loading ? <div>...loading</div> : null}

                                    {suggestions.map((suggestion, index) => {
                                        const style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                        };

                                        return (
                                            <div {...getSuggestionItemProps(suggestion, { style })} key={index}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    <Input
                        type="text"
                        label="Latitude" 
                        id="latitude" 
                        name="latitude"
                        disabled
                        {...latitude}
                    />

                    <Input
                        type="text"
                        label="Longitude" 
                        id="longitude"  
                        name="longitude"
                        disabled
                        {...longitude}
                    />
                </>
            }
       
        </>
    )
}

export default InputAddress