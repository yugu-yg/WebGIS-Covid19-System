import psycopg2
from sqlalchemy import create_engine
import pandas as pd
import os


# csv文件所在的文件夹
# 如果只有一个文件
# Folder_Path = r'C:\Users'

table1 = pd.read_csv('data\\yichang_comfirmed_cases.csv', header=0)

connect = create_engine(
    'postgresql+psycopg2://' + 'postgres' + ':' + '123' +
    '@127.0.0.1' + ':' + str(5432) + '/' + 'covid19')

pd.io.sql.to_sql(table1, name='yichang_comfirmed_cases', con=connect, index=False, 
                 if_exists='replace', chunksize=1000)

connect.dispose()
