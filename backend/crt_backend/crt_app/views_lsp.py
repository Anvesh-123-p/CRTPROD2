from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
import smtplib




class LessonPlanEditView(APIView):
    def patch(self,request):
        data=request.data
        print(request.data)
        try:
            lsp = LessonPlan.objects.get(id = request.data.get('lspid'))
        except User.DoesNotExist:
            return Response(
                {"status": "error", "message": "Lesson Plan not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        print(lsp)
        d=request.data


       

            
        topics = Topic.objects.filter(LessonPlan_id=request.data.get('lspid'))
        topiseri = TopicSerializer(topics,many=True)
        su=0
        for i in topiseri.data:

            print(i['hours'])
            su=su+i['hours']
        d['totalhours']=int(su)


        # for i in topiseri.data:
            
        #     dataaa={
        #         'percent_constituting':int(i['hours']*100/su)
        #     }
            # item= Topic.objects.get(id = i['id'])

            # item = get_object_or_404(Topic, id=i['id'])
    
    # Partially update the subject
        serializer = LessonPlanSerializer(lsp, data=d, partial=True)
        if serializer.is_valid():
            print('entered ser')
            # serializerrr = TopicSerializer(item, data=dataaa, partial=True)
            # print(serializerrr)
            # if serializerrr.is_valid():
            #     serializerrr.save()
                
            # else:
            #     print(serializerrr.errors)
            serializer.save()
                
                

                # topiseri = TopicSerializer(item,data=dataaa,partial=True)
                # if(topiseri.is_valid()):
                #     topiseri.save()
                #     serializer.save()
                # else:
                #     print("hi")





            
            hod = User.objects.get(user_type='HOD', dept=data["dept"])
            getdat=serializer.data['subject_id']

            item = get_object_or_404(Subject, sub_id=getdat)
            subserializer = SubjectSerializer(item)

            print(subserializer.data)






            print("about to create approval")
            Approval.objects.create(
                    user_email=data["email"],
                    # user_name=data["name"],
                    hod_id=hod,
                    dept=data["dept"],
                    status='pending',
                    approval_type='new_lessonplan_approval',
                    old_data="NO Lesson Plan",
                    new_data=subserializer.data
                )
            
            return Response({"status": "success", "data": LessonPlanSerializer(lsp).data}, status=200)
        else:
            print("errors")
            print(serializer.errors)
            return Response({"status": "error", "data": serializer.errors}, status=400)
#     def get(self, request):
#         queryset = LessonPlan.objects.all()  # Query all Topic instances
#         serializer = LessonPlanSerializer(queryset, many=True)  # Serialize the queryset
#         return Response(serializer.data, status=status.HTTP_200_OK)  # Return the serialized data with a 200 OK status
    
#     def post(self, request):
#         serializer = LessonPlanSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()  # This will create the LessonPlan instance and associate the topics
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#     def delete(self, request):
#         param = request.GET
#         lsp_id = param.get('id')  # Fetch the id from query parameters

#         if not lsp_id:
#             return Response({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             lsp = get_object_or_404(LessonPlan, id=lsp_id)  # Fetch the Topic instance by ID or return 404 if not found
#             lsp.delete()  # Delete the topic instance
#             return Response({"message": "Topic deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
#         except ValueError:
#             return Response({"error": "Invalid ID provided"}, status=status.HTTP_400_BAD_REQUEST)
 