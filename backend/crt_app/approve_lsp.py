
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
import smtplib
import json
import ast
import pandas as pd
from datetime import date
from datetime import datetime, timedelta
class LspView(APIView):
    def patch(self, request):
        action = request.data.get('status')
        approval_id = request.data.get('approval_id')
        
        print(action,approval_id)
        if not action or not approval_id:
            return Response({'error': 'Action and approval_id are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            approval = Approval.objects.get(approval_id=approval_id)
            # Retrieve details from the approval record
            user_email = approval.user_email
            approval_type = approval.approval_type
            old_data = approval.old_data
            new_data = approval.new_data
            user_name=approval.user_name
            new_data = json.loads(new_data.replace("\'", "\""))

            
            sub_id=new_data['sub_id']
            print(sub_id)


            # Retrieve the associated user
            
            
            if action == 'approved':
                print('entered')
                user = User.objects.get(email=user_email)
                lsp=LessonPlan.objects.get(subject_id=sub_id)
                lid=LessonPlanSerializer(lsp)
                lid=lid.data['id']
                print(lid)
                print("==========")
        

                queryset = Topic.objects.filter(LessonPlan_id=lid)  
                serializertop = TopicSerializer(queryset,many=True)
                q=1
                pencount=0
                cocount=0
                for i in serializertop.data:
                    if(i['status']=='Not Started'):
                        q=0
                        pencount=pencount+i['hours']
                    else:
                        cocount=cocount+i['hours']
                if(q==1):
                    d={
                        'status':'Completed',
                        'completedhours':cocount,
                        'pendinghours':pencount
                    }
                    # lsp = LessonPlan.objects.get(id = request.data['LessonPlan_id'])
                    lspser = LessonPlanSerializer(lsp, data=d, partial=True)
                    if lspser.is_valid():
                        lspser.save()
                        return Response({"status": "success", "data": 'Subject Fully Completed'}, status=200)


                else:
                    d={
                        'status':'In Progress',
                        'completedhours':cocount,
                        'pendinghours':pencount
                        
                    }
                    # lsp = LessonPlan.objects.get(id = request.data['LessonPlan_id'])
                    lspser = LessonPlanSerializer(lsp, data=d, partial=True)
                    if lspser.is_valid():
                        lspser.save()
                approval.status = 'approved'
                approval.save()
                # sendmail_response(user_name,approval_type,old_data,new_data,user_email,action)
                return Response({'message': 'Approval accepted and user updated successfully.'}, status=status.HTTP_200_OK)        
            elif action == 'rejected':
                approval.status = 'Rejected'
                lsp=LessonPlan.objects.get(subject_id=sub_id)
                lsp.status = 'Rejected'
                lsp.save()

                approval.save()
                # sendmail_response(user_name,approval_type,old_data,new_data,user_email,action)
                return Response({'message': 'Approval rejected successfully.'}, status=status.HTTP_200_OK)
        
            else:
                return Response({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)
        except Approval.DoesNotExist:
            return Response({'error': 'Approval record not found.'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    