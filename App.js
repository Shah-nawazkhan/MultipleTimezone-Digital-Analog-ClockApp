/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text, View,
    SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import AnalogClock from 'react-native-clock-analog';
import { DateTime } from 'luxon';

const getTimeInTimeZone = (timeZone) => {
    return DateTime.now().setZone(timeZone).toFormat('T');
};

const timeZones = [
    { label: 'London', value: 'Europe/London', color: '#93E2E0' },
    { label: 'Tokyo', value: 'Asia/Tokyo', color: '#DCA0E3' },
    { label: 'Sydney', value: 'Australia/Sydney', color: '#F1DD8B' },
    { label: 'Indian Time Zone', value: 'Asia/Kolkata', color: '#DE9181' },
    { label: 'United States', value: 'America/New_York', color: '#8189DE' },
    { label: 'United Kingdom', value: 'Europe/London', color: '#93E2E0' },
    { label: 'Japan', value: 'Asia/Tokyo', color: '#DCA0E3' },
    { label: 'Australia', value: 'Australia/Sydney', color: '#F1DD8B' },
    { label: 'Canada', value: 'America/Toronto', color: '#F1DD8B' },
    { label: 'Germany', value: 'Europe/Berlin', color: '#93E2E0' },
    { label: 'France', value: 'Europe/Paris', color: '#F1DD8B' },
    { label: 'China', value: 'Asia/Shanghai', color: '#F1DD8B' },
    { label: 'Brazil', value: 'America/Sao_Paulo', color: '#93E2E0' },
    { label: 'Pakistan', value: 'Asia/Karachi', color: '#DE9181' },
    { label: 'United Arab Emirates', value: 'Asia/Dubai', color: '#93E2E0' },
    { label: 'South Africa', value: 'Africa/Johannesburg', color: '#8189DE' },
    { label: 'Mexico', value: 'America/Mexico_City', color: '#F1DD8B' },
];

const countryTimeZones = {
    'United States': 'America/New_York',
    'United Kingdom': 'Europe/London',
    'Japan': 'Asia/Tokyo',
    'Australia': 'Australia/Sydney',
    'Canada': 'America/Toronto',
    'Germany': 'Europe/Berlin',
    'France': 'Europe/Paris',
    'China': 'Asia/Shanghai',
    'Brazil': 'America/Sao_Paulo',
    'Pakistan': 'Asia/Karachi',
    'United Arab Emirates': 'Asia/Dubai',
    'South Africa': 'Africa/Johannesburg',
    'Mexico': 'America/Mexico_City',
};

export default function App() {
    const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0].value);
    const [time, setTime] = useState(DateTime.now());
    const [clockType, setClockType] = useState('analog');

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(DateTime.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const renderClock = () => {
        if (clockType === 'analog') {
            return (
                <AnalogClock
                    key={selectedTimeZone}
                    colorClock={
                        timeZones.find(
                            (zone) =>
                                zone.value ===
                                selectedTimeZone).color
                    }
                    colorNumber="#000000"
                    colorCenter="#00BCD4"
                    colorHour="#FF8F00"
                    colorMinutes="#FFC400"
                    hour={time.setZone(selectedTimeZone).hour}
                    minutes={time.setZone(selectedTimeZone).minute}
                    seconds={time.setZone(selectedTimeZone).second}
                    autostart={true}
                    showSeconds={true}
                />
            );
        } else {
            return (
                <Text style={
                    [styles.digitalClock,
                    {
                        color:
                            timeZones.find(
                                (zone) =>
                                    zone.value ===
                                    selectedTimeZone).color
                    }]}>
                    {getTimeInTimeZone(selectedTimeZone)}
                </Text>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Time Zone App</Text>
            <Text style={styles.subHeading}>
                Multiple Timezone Digital & Analog App
            </Text>
            <View style={styles.controlsContainer}>
                <View style={styles.timezonePicker}>
                    <View style={styles.country}>
                        <Text style=
                            {
                                { fontWeight: 'bold' }
                            }>
                            Select Country
                        </Text>
                        <Picker
                            selectedValue={selectedTimeZone}
                            onValueChange={(itemValue) => setSelectedTimeZone(itemValue)}
                        >
                            {Object.entries(countryTimeZones).map(([country, timeZone]) => (
                                <Picker.Item label={country} value={timeZone} key={country} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={styles.clockTypePicker}>
                    <View style={{
                        padding: 10,
                        borderRadius: 20,
                        marginTop: 20,
                        backgroundColor: 'lightblue',
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Select Clock Type
                        </Text>
                        <Picker
                            selectedValue={clockType}
                            onValueChange={(itemValue) =>
                                setClockType(itemValue)
                            }
                        >
                            <Picker.Item label="Analog Clock" value="analog" key="analog" />
                            <Picker.Item label="Digital Clock" value="digital" key="digital" />
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={styles.clockContainer}>
                <View style={
                    [styles.colorMarker,
                    {
                        backgroundColor:
                            timeZones.find(
                                (zone) =>
                                    zone.value ===
                                    selectedTimeZone).color
                    }
                    ]} />
                <Text style={
                    [styles.title,
                    {
                        color:
                            timeZones.find(
                                (zone) =>
                                    zone.value ===
                                    selectedTimeZone).color
                    }]}>
                    {
                        timeZones.find(
                            (zone) =>
                                zone.value ===
                                selectedTimeZone).label
                    }
                </Text>
                {renderClock()}
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		margin: 10,
		backgroundColor: '#FEFFF1',
		borderRadius: 10,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},

	timezonePicker: {
		marginBottom: 20,
	},
	clockContainer: {
		alignItems: 'center',
	},

	title: {
		fontSize: 23,
		marginBottom: 10,
	},
	digitalClock: {
		fontSize: 20,
	},

	controlsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
		marginLeft: 20,
		marginRight: 20,
	},

	clockTypePicker: {
		flex: 1,
		marginLeft: 10,
	},

	heading: {
		fontSize: 40,
		color: 'darkblue',
		fontWeight: 'bold',
		marginTop: 20,
		backgroundColor: 'lightblue',
		borderRadius: 10,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},

	subHeading: {
		marginBottom: 20,
		fontSize: 20,
		padding: 20,
		color: 'blue',
		fontWeight: 'bold',
		marginTop: 10,
	},
	country: {
		padding: 10,
		borderRadius: 20,
		marginTop: 20,
		backgroundColor: 'lightblue',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},

});
