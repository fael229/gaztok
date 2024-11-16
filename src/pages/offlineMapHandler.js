import { useEffect } from 'react';
import Mapbox, { offlineManager } from "@rnmapbox/maps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Dimensions } from 'react-native';

const OFFLINE_MAP_KEY = 'BENIN_OFFLINE_MAP';
const MAP_DOWNLOAD_STATUS = 'MAP_DOWNLOAD_STATUS';

// Coordonnées centrées sur Cotonou et ses environs
const BENIN_BOUNDS = {
  // Cotonou et environs
  north: 6.4000,  // Nord de Cotonou
  south: 6.3000,  // Sud de Cotonou
  east: 2.4500,   // Est de Cotonou
  west: 2.3000,   // Ouest de Cotonou
  minZoom: 12,    // Zoom minimum augmenté
  maxZoom: 14     // Zoom maximum limité
};

export const useOfflineMap = (setProgress, setIsMapDownloaded) => {
  const downloadOfflineMap = async () => {
    try {
      const isDownloaded = await AsyncStorage.getItem(MAP_DOWNLOAD_STATUS);
      if (isDownloaded === 'true') {
        setIsMapDownloaded(true);
        setProgress(100);
        console.log('Carte déjà téléchargée');
        return;
      }

      console.log("Initialisation du téléchargement de la carte...");

      // Calculer le nombre approximatif de tuiles avant le téléchargement
      const latDiff = BENIN_BOUNDS.north - BENIN_BOUNDS.south;
      const lonDiff = BENIN_BOUNDS.east - BENIN_BOUNDS.west;
      const zoomRange = BENIN_BOUNDS.maxZoom - BENIN_BOUNDS.minZoom + 1;
      
      // Log pour debug
      console.log(`Zone de carte: ${latDiff}°x${lonDiff}°, niveaux de zoom: ${zoomRange}`);

      const options = {
        name: OFFLINE_MAP_KEY,
        styleURL: Mapbox.StyleURL.Street,
        bounds: [
          [BENIN_BOUNDS.west, BENIN_BOUNDS.south],
          [BENIN_BOUNDS.east, BENIN_BOUNDS.north]
        ],
        minZoom: BENIN_BOUNDS.minZoom,
        maxZoom: BENIN_BOUNDS.maxZoom,
        includeIdeographs: false,
        metadata: {
          region: "Cotonou",
          purpose: "utilisation hors ligne",
          version: "1.0"
        },
      };

      await offlineManager.createPack(
        options,
        async (region, status) => {
          const percentage = Math.round(status.percentage);
          console.log(`Progression: ${percentage}%, Tuiles: ${status.completedTileCount}/${status.requiredTileCount}`);
          setProgress(percentage);
          
          if (percentage === 100) {
            await AsyncStorage.setItem(MAP_DOWNLOAD_STATUS, 'true');
            setIsMapDownloaded(true);
            console.log('Téléchargement de la carte terminé');
            Alert.alert(
              'Succès',
              'La carte de Cotonou a été téléchargée avec succès pour une utilisation hors ligne.'
            );
          }
        },
        (region, error) => {
          console.error('Erreur lors du téléchargement :', error);
          Alert.alert(
            'Erreur',
            `Une erreur est survenue lors du téléchargement de la carte: ${error.message}`
          );
        }
      );

    } catch (error) {
      console.error("Erreur lors de l'initialisation du téléchargement :", error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de l\'initialisation du téléchargement.'
      );
    }
  };

  const checkAndInitializeOfflineMap = async () => {
    try {
      const isDownloaded = await AsyncStorage.getItem(MAP_DOWNLOAD_STATUS);
      if (isDownloaded === 'true') {
        setProgress(100);
        setIsMapDownloaded(true);
        return;
      }

      const packs = await offlineManager.getPacks();
      const offlinePack = packs.find(pack => pack.name === OFFLINE_MAP_KEY);
      
      if (offlinePack) {
        const status = await offlinePack.status();
        if (status.percentage === 100) {
          await AsyncStorage.setItem(MAP_DOWNLOAD_STATUS, 'true');
          setProgress(100);
          setIsMapDownloaded(true);
          console.log('Carte hors ligne prête à utiliser');
        } else {
          await downloadOfflineMap();
        }
      } else {
        await downloadOfflineMap();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des cartes hors ligne:', error);
    }
  };

  const clearOfflineMap = async () => {
    try {
      await offlineManager.resetDatabase();
      await AsyncStorage.removeItem(MAP_DOWNLOAD_STATUS);
      setIsMapDownloaded(false);
      setProgress(0);
      console.log('Carte hors ligne supprimée');
    } catch (error) {
      console.error('Erreur lors de la suppression de la carte:', error);
    }
  };

  return {
    downloadOfflineMap,
    checkAndInitializeOfflineMap,
    clearOfflineMap
  };
};