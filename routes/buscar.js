import { Router } from 'express';
import { buscar } from '../controllers/buscar.js';
export const rou = Router();

rou.get('/:coleccion/:termino', buscar )