# App configuration
import os

class Config:
    DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/crime_data.csv")
    DEBUG = True
    JSON_SORT_KEYS = False
