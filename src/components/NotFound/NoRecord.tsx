import {PageContainer} from "@ant-design/pro-components";
import {Empty} from "antd";
import noRecord from '@/assets/no_record.svg';
import React from "react";

const NoRecord: React.FC<any> = ({desc, height = 180, image = noRecord}) => {

  return (
    <PageContainer title={false} breadcrumb={{}}>
      <Empty
        image={image}
        imageStyle={{
          height,
        }}
        description={desc || '暂无数据'}
      >
      </Empty>
    </PageContainer>
  );
};

export default NoRecord;
