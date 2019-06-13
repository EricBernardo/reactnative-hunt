import React, { Component } from 'react';

import api from '../services/company';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends Component {

    static navigationOptions = {
        title: "EMPRESAS"
    };

    state = {
        dataInfo: {},
        data: [],
        page: 1
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async (page = 1) => {
        console.log('REQUEST');
        const response = await api.get(`/company?page=${page}`);
                
        const { data, ...dataInfo } = response.data;
        
        this.setState({
            data:[...this.state.data, ...data], 
            dataInfo,
            page
        });
        
    }
    
    renderItem = ({ item }) => (
        
        <View style={styles.companyContainer}>
            <Text style={styles.companyTitle}>{item.title}</Text>

            <TouchableOpacity 
                style={styles.companyButton}
                onPress={() => {
                    this.props.navigation.navigate('company', {company: item})
                }}
             >
                <Text style={styles.companyButtonText}>Acessar</Text>
            </TouchableOpacity>

        </View>
    )

    loadMore = () => {

        const { page, dataInfo } = this.state;
        
        if(page === dataInfo.last_page) return;

        const pageNumber = page + 1;

        this.loadData(pageNumber);

    }

    render(){
        
        return (
            <View style={styles.container}>
                <FlatList 
                contentContainerStyle={styles.list}
                data={this.state.data}
                keyExtractor={(item, index) => item.key}
                renderItem={this.renderItem}
                onEndReached={this.loadMore()}
                onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    list: {
        padding: 20
    },

    companyContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20 
    },

    companyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },

    companyButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    companyButtonText: {
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold'
    }

})