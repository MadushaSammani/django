from geo.Geoserver import Geoserver
geo = Geoserver('http://127.0.0.1:8080/geoserver', 
                username='admin', 
                password='geoserver'
                )
# For creating workspace
geo.create_workspace(workspace='madusha_demo')