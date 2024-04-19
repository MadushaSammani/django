from django.shortcuts import render
from .models import shp

# Create your views here.
def index(request):
    Shp = shp.objects.all()
    return render (request, 'index.html', {'Shp': Shp})

def note(request):
    if(request.method == 'POST'):
        note_heading = request.POST.get('note-heading')
        lat = request.POST.get('lat')
        lng = request.POST.get('lng')
        print(note_heading, note, lat, lng, 'email username')
        return render(request, 'index.html')
    return render(request, 'index.html')
