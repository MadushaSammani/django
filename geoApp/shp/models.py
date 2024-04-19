from django.db import models
import datetime
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
import geopandas as gpd
import os
import glob
from django.db import connection
from django.db import connections
import zipfile
from sqlalchemy import *
from geo.Geoserver import Geoserver
from sqlalchemy import types
from pg.pg import Pg
from geoalchemy2 import Geometry, WKTElement

# Create your models here.

# initializing the library
db = Pg(dbname='OSM_Data', 
        user='postgres',
        password='dapeng', 
        host='localhost', 
        port='5432')
geo = Geoserver('http://127.0.0.1:8080/geoserver',
                username='admin', password='geoserver')
conn_str = 'postgresql://postgres:dapeng@localhost:5432/OSM_Data'

######################################################################################
# Create a shp model. This help to upload shapefiles to a superuser
######################################################################################
class shp(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000, blank=True)
    file = models.FileField(upload_to='%Y/%m/%d')
    uploaded_date = models.DateField(default=datetime.date.today, blank=True)

    # Returns the string representation of the model.
    def __str__(self):
        return self.name
    # blish shapefile to user server

#########################################################################################
# Django post save signal to publish the data in to actual database
#########################################################################################

@receiver(post_save, sender=shp)
def publish_data(sender, instance, created, **kwargs):
    file = instance.file.path
    file_name = os.path.basename(file).split('.')[0]
    file_path = os.path.dirname(file)
    name = instance.name

    # Extract shapefile from the zip archive
    with zipfile.ZipFile(file, 'r') as zip_ref:
        zip_ref.extractall(file_path)
    
    # Remove the zip file
    os.remove(file)

    # Find shapefile (.shp) in the extracted directory
    shp_files = glob.glob(os.path.join(file_path, '**', '*.shp'), recursive=True)
    if not shp_files:
        print("No shapefiles found in the extracted directory.")
        return
    
    req_shp = shp_files[0]

    # Read shapefile into a GeoDataFrame
    gdf = gpd.read_file(req_shp)
    
    # Create SQLAlchemy engine from connection string
    engine = create_engine(conn_str)

    # Write GeoDataFrame to PostGIS database
    gdf.to_postgis(
        name=name,
        con=engine,
        schema='public',  # Adjust schema as needed
        if_exists="replace"
    )

    # You need to replace `geo` and `db` with appropriate references
    # Create feature store and publish feature store
    # Assuming `geo.create_featurestore` and `geo.publish_featurestore` are defined elsewhere
    geo.create_featurestore(
        store_name='OSM_geoApp',
        workspace='OSM_geoApp',
        db='OSM_Data',
        host='localhost',
        pg_user='postgres',
        pg_password='dapeng',
        schema='public',  # Adjust schema as needed
    )
    geo.publish_featurestore(
        workspace='OSM_geoApp',
        store_name='OSM_geoApp',
        pg_table=name,
    )

@receiver(post_delete, sender=shp)
def delete_data(sender, instance, **kwargs):
    # Delete table from database upon deletion of shp instance
    with connections['default'].cursor() as cursor:
        cursor.execute("DROP TABLE IF EXISTS data.{} CASCADE;".format(instance.name))


    
    




    